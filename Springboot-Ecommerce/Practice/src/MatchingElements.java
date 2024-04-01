import java.util.Arrays;
import java.util.HashMap;
public class MatchingElements {
	public static void main(String[] args) {
//		int[] a = { 1, 2, 3, 4, 5, 1, 2, 6, 1, 7};
//		int[] b=new int[a.length];
//		for (int m = 0; m < a.length; m++) {	
//			for (int n = m + 1; n < a.length; n++) {
//				String s =Arrays.toString(a);
//				if (a[m] == a[n])
//					System.out.print(a[m]+" ");
//			}
//		}
	int df$$3_=10;
		HashMap<String, Integer> myMap = new HashMap<String, Integer>() {
				
		{
            put("key1", 1);
            put("key2", 2);
            put("key1", 3);
        }};
        System.out.println(myMap);
				HashMap<String, Integer> map = new HashMap<String, Integer>() ;
		map.put("string",5);
		map.put("string", 6);
		System.out.println(map);
	}
}