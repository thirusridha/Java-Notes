package com.example.demo.controller;

public class Test {
	public static void main(String[] args) {
		int lines = 4;
		int count = 1;
		while (count <= lines) {
			int space = 0;
			while (space++ < lines - count) {
				System.out.print(" ");
			}
			int star = 1;
			while (star++ <= count * 2 - 1) {
				System.out.print("*");

			}
			count++;
			System.out.println();

		}

	}
}
