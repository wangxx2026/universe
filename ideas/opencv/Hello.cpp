#include <opencv2/opencv.hpp>
#include <string>
#include <iostream>
#include <algorithm>
#include <stdlib.h>


using namespace std;
using namespace cv;

void combine_contour(vector< Point>& c1, vector< Point>&c2)
{
	for (auto p : c2) c1.push_back(p);

	vector< Point> hull;
	convexHull(Mat(c1), hull, false);
	c1 = hull;
}

void merge_contours(vector< vector< Point> >& contours)
{
	size_t i = 0;

	while (i < contours.size() - 1) {
		auto& c_i = contours[i];
		auto& c_i_1 = contours[i+1];

		auto r1 = boundingRect(Mat(c_i));
		auto r2 = boundingRect(Mat(c_i_1));

		auto area1 = r1.width * r1.height;
		auto area2 = r2.width * r2.height;
    	auto m=min(area1,area2);

		auto min_width = min(r1.width, r2.width);
		auto r1_ = r1;
		r1_.height = 1;
		r1_.y = 1;
		auto r2_ = r2;
		r2_.height = 1;
		r2_.y = 1;

		auto r3 = r1 & r2;
		auto area3 = r3.width * r3.height;

		auto r3_ = r1_ & r2_;

		if ( (area3 > (m/5.)) || (r3_.x > (min_width/3.))) {
			//合并
			combine_contour(c_i, c_i_1);
			contours.erase(contours.begin() + (i+1));
		} else {
			i++;
		}

	}
}

bool sort_contours(const vector< Point> &c1, const vector< Point> &c2)
{
	auto r1 = boundingRect(Mat(c1));
	auto r2 = boundingRect(Mat(c2));

	//从左到右
	return r1.x < r2.x;
}

Mat histeq(Mat in)                                                                                                                                                            
{
    Mat out(in.size(), in.type());
    if(in.channels()==3){
        Mat hsv;
        vector<Mat> hsvSplit;
        cvtColor(in, hsv, CV_BGR2HSV);
        split(hsv, hsvSplit);
        equalizeHist(hsvSplit[2], hsvSplit[2]);
        merge(hsvSplit, hsv);
        cvtColor(hsv, out, CV_HSV2BGR);
    }else if(in.channels()==1){
        equalizeHist(in, out);
    }

    return out;
}

Mat preprocessChar(Mat in){
	Mat grayResult;
	cvtColor(in, grayResult, CV_BGR2GRAY);
	blur(grayResult, grayResult, Size(2,2));
	grayResult=histeq(grayResult);

	Mat thresh_img;
	threshold(grayResult, thresh_img, 90, 255, /*CV_THRESH_OTSU+*/CV_THRESH_BINARY_INV);


/*
	imshow("test", grayResult);
	waitKey(0);
*/

/*
	imshow("test", thresh_img);
	waitKey(0);
*/

    //Remap image
    int h=thresh_img.rows;
    int w=thresh_img.cols;
    Mat transformMat=Mat::eye(2,3,CV_32F);
    int m=max(w,h);
    transformMat.at<float>(0,2)=m/2 - w/2;
    transformMat.at<float>(1,2)=m/2 - h/2;

    Mat warpImage(m,m, thresh_img.type());
    warpAffine(thresh_img, warpImage, transformMat, warpImage.size(), INTER_LINEAR, BORDER_CONSTANT, Scalar(0) );

    Mat out;
    resize(warpImage, out, Size(18, 18) );

/*
	imshow("test", out);
	waitKey(0);
*/

	return out;


}

bool verifyRR(RotatedRect r)
{
	auto w = r.size.width;
	auto h = r.size.height;

    int m=max(w,h);
	if (m < 25) return false;

	return true;
}

vector<Mat> segment(Mat in)
{
	vector<Mat> s;

	//灰度
	Mat img_gray;
	cvtColor(in, img_gray, CV_BGR2GRAY);
	//blur(img_gray, img_gray, Size(5,5));

/*
	imshow("test", img_gray);
	waitKey(0);
*/
	//cout << "test2" << endl;
	//阀值
	Mat img_threshold;
	threshold(img_gray, img_threshold, 0, 255, CV_THRESH_OTSU+CV_THRESH_BINARY_INV);
/*
	imshow("test", img_threshold);
	waitKey(0);
*/

	auto clone = img_threshold.clone();
	//cout << "test3" << endl;
	//轮廓
	vector< vector< Point> > contours;
	findContours(img_threshold, contours, CV_RETR_EXTERNAL, CV_CHAIN_APPROX_NONE);
	//cout << "test4" << endl;

	vector< vector< Point> > contours2;
	for (auto& c:contours) {
		auto mr= minAreaRect(Mat(c));
		if (verifyRR(mr)) contours2.push_back(c);
	}
	contours = contours2;
	//合并轮廓
	sort(contours.begin(), contours.end(), sort_contours);
	merge_contours(contours);

	//画轮廓
	Mat result;
	clone.copyTo(result);
	drawContours(result, contours, -1, Scalar(255,0,0), 1);
	//cout << "test5" << endl;

	imshow("test", result);
	waitKey(0);

	auto itc= contours.begin();
	while (itc!=contours.end()) {
		//旋转
		auto rect = boundingRect(*itc);
/*
		auto rotmat= getRotationMatrix2D(mr.center, mr.angle, 1);
		Mat img_rotated;
		warpAffine(in, img_rotated, rotmat, in.size(), CV_INTER_CUBIC);
*/
/*
		imshow("img_rotated", img_rotated);
		waitKey(0);
*/
		//裁剪
		Mat img_crop;
		getRectSubPix(in, rect.size(), Point(rect.x + rect.width/2., rect.y + rect.height/2.), img_crop);


/*
		imshow("img_crop", img_crop);
		waitKey(0);
*/


		auto normal_crop = preprocessChar(img_crop);
		s.push_back(normal_crop);
/*
		cout << "before show" << endl;
		imshow("normal_crop", normal_crop);
		waitKey(0);
		cout << "after show" << endl;
*/


		itc++;
	}


	return s;
}

void predict_img(CvSVM& svm, string img_path)
{
	cout << "img: " << img_path << endl;
	auto image = imread(img_path);
	auto s = segment(image);

	for (auto &ch : s) {
		auto m = ch.reshape(1, 1);
		m.convertTo(m, CV_32FC1);
		auto response = (int)svm.predict(m);

		cout << response << " ";
	}

	cout << endl;
	waitKey(0);
}

void predict(CvSVM& svm)
{
	predict_img(svm, "/home/vagrant/opensource/ngx_openresty-1.7.10.2/test/ideas/opencv/data/input.png");
	predict_img(svm, "/home/vagrant/opensource/ngx_openresty-1.7.10.2/test/ideas/opencv/data/input2.png");
	predict_img(svm, "/home/vagrant/opensource/ngx_openresty-1.7.10.2/test/ideas/opencv/data/input3.png");
	predict_img(svm, "/home/vagrant/opensource/ngx_openresty-1.7.10.2/test/ideas/opencv/data/input4.png");

	for (int i = 1; i <= 6; i++) {
		auto img_path = string("/home/vagrant/opensource/ngx_openresty-1.7.10.2/test/ideas/opencv/data/new_data/t" + to_string(i) + ".png");
		predict_img(svm, img_path);
	}
}


void train()
{
	Mat SVM_TrainingData;
	Mat SVM_Classes;
	for (int i = 0; i <= 9; i++) {
		stringstream ss;
		ss << "/home/vagrant/opensource/ngx_openresty-1.7.10.2/test/ideas/opencv/data/";
		ss << i;
		ss << ".png";
		auto img_path = ss.str();
		auto image = imread( img_path, CV_LOAD_IMAGE_COLOR);
		//cout << img_path << endl;
		//cout << "test1" << endl;

		auto s = segment(image);
		for (auto &ch : s) {
			auto m = ch.reshape(1, 1);
			m.convertTo(m, CV_32FC1);
			SVM_TrainingData.push_back(m);
			SVM_Classes.push_back(i);
		}
	}

	for (int i = 0; i <= 23; i++) {
		stringstream ss;
		ss << "/home/vagrant/opensource/ngx_openresty-1.7.10.2/test/ideas/opencv/data/new_data/";
		ss << i;
		ss << ".png";
		auto img_path = ss.str();
		auto image = imread( img_path, CV_LOAD_IMAGE_COLOR);
		auto s = segment(image);
		if (s.size() != 10) {
			cout << "new_data segment fail" << endl;
			exit(1);
		}
		int idx = 0;
		for (auto &ch : s) {
			auto m = ch.reshape(1, 1);
			m.convertTo(m, CV_32FC1);
			SVM_TrainingData.push_back(m);
			SVM_Classes.push_back(idx++);
		}

	}

	//Set SVM params
    CvSVMParams SVM_params;
    SVM_params.svm_type = CvSVM::C_SVC;
    SVM_params.kernel_type = CvSVM::LINEAR; //CvSVM::LINEAR;
    SVM_params.degree = 0;
    SVM_params.gamma = 1;
    SVM_params.coef0 = 0;
    SVM_params.C = 1;
    SVM_params.nu = 0;
    SVM_params.p = 0;
    SVM_params.term_crit = cvTermCriteria(CV_TERMCRIT_ITER, 1000, 0.01);
    //Train SVM
    CvSVM svmClassifier(SVM_TrainingData, SVM_Classes, Mat(), Mat(), SVM_params);

	predict(svmClassifier);
}

int main()
{
	train();
}
