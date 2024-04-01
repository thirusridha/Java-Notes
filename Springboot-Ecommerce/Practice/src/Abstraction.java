abstract class Animal { 
    abstract void walk(); 
    void eat() 
    { 
        System.out.println("The animal is eating."); 
    } 
    Animal() 
    { 
        System.out.println( 
            "An Animal is going to be created."); 
    } 	
//    abstract void m();
} 
  class Cow extends Animal { 
    Cow() { System.out.println("You have created a Cow"); } 
    void walk() { System.out.println("Cow is walking."); } 

} 
 class Goat extends Animal { 
    Goat() 
    { 
        System.out.println("You have created a Goat"); 
    } 
    void walk() { System.out.println("Goat is walking."); } 
} 
 public class Abstraction { 
    public static void main(String args[]) 
    { 
        Cow cow = new Cow(); 
        cow.walk(); 
        cow.eat(); 
        Goat goat = new Goat(); 
        goat.walk(); 
        goat.eat(); 
    } 
}
