package com.mycompany.app;
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Calculator calculator = new Calculator();

        File f = new File("../../../../../../test.txt");
        String str;
        try (BufferedReader br = new BufferedReader(new FileReader(f))) {
            str = br.readLine();
        }

        String[] s = str.split("=");
        double result = calculator.evaluate(s[0]);
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(f))) {
            writer.write(s[0] + " = " + result);
        }
        
        System.out.println(s[0] + " = " + result);
    }
}