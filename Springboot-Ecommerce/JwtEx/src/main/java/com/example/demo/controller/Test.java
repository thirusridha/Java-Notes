package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Test {

	public static void main(String args[]) {

//		int arr[]={2,6,0,7,0,6,7,0,1}; 
// 		int test[]=new int[arr.length];  
//		int j=0;
//		for(int i=0;i<arr.length;i++){
//			
//			if(arr[i]!=0){
//				test[j]=arr[i];
//                j++;
//			}
//		}
//		for(int i=0;i<test.length;i++) {
//			System.out.print(test[i]);
//		}
// 	}
		List<Integer> l=new ArrayList<>();
		l=l.stream().filter(null).collect(Collectors.toList());
		
		int num = 10;
		switch (num) {
		case 0: {
			System.out.println("case 0");
		}
		case 13:{
			System.out.println("casse 10");
		}
		case 1+9:{
			System.out.println("casse 10");
		}
//		case 10:{
//			System.out.println("casse 10");
//		}
		}
	}
}