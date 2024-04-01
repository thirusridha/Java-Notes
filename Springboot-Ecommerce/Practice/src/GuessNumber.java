import java.util.Scanner;
public class GuessNumber {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int guess = (int) (Math.random() * 100 + 1);
//		System.out.println(guess);
		System.out.print("Guess my number : ");
		boolean check = true;
		int times = 0;
		while (check) {
			int num = sc.nextInt();
			if (num > 0 && num <= 100) {
				if (guess == num) {
					times++;
					System.out.println("good job! you have entered currect value");
					System.out.println("you have attempted for " + times + " times");
					check = false;
				} else if (guess < num) {
					System.out.print("Enter small number : ");
					times++;
				} else if (guess > num) {
					System.out.print("Enter big number : ");
					times++;
				}
			} else {
				System.out.println("please enter the number between 1 to 100.");
			}
		}
	}
}
