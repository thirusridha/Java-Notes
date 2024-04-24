import java.util.*;

public class StringJumble {
    public static void main(String[] args) {
        String input = "sridhar";
        String jumbledString = jumbleWord(input);
        System.out.println(jumbledString);
    }
    public static String jumbleWord(String word) {
        List<Character> characters = new ArrayList<>();
        for (char c : word.toCharArray()) {
            characters.add(c);
        }
        Collections.shuffle(characters); 
//        StringBuilder jumbledWord = new StringBuilder();
        String str="";
        for (char c : characters) {
           str=str+c;
        }
        return str;
    }
}
