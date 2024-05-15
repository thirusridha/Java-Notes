package com.eazybytes.loans;
import java.util.*;
public class Test { 
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("enter a number :  ");
		Integer n = sc.nextInt();
		List<Integer> list = new ArrayList<Integer>();
		for (int i = 1; i <= n; i++) {
			list.add(i);
		}
		String check="even";
		while (list.size() != 1) {
			if(check.equals("even")) {
				check="odd";
				 for(int i=1;i<list.size();i=i+1) {
					 if(i==list.size()-1) {
						 check="even";
					 }
					   list.remove(i);
				   }
			}
			else if(check.equals("odd")){
				for(int i=0;i<list.size();i=i+1) {
					 if(i==list.size()-1) {
						 check="even";
					 }
					   list.remove(i);
				   }
			}
		  
		}
		System.out.println(list);
	}
}
