package com.mycompany.app;


import java.io.*;
import java.util.Arrays;

public class Checker {
    public static void main(String[] args) throws IOException {
        String path = "/home/abul/Desktop/MAVEN/my-app/file.tx";
        //reader(path);
        String t = readerForTest(path);
        System.out.println(t);
    }
    public static void reader(String path)throws IOException {
        File file = new File(path);
        FullCalculator calc = new FullCalculator();

        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);

        String line = br.readLine();
        String expect = "";
        String[] parts = line.split(" ");
        if (line.contains("=")) {
            if (parts[parts.length - 2].equals("=")) {
                expect = parts[parts.length - 1];
            }
        }
        String result = "";
        if (expect.isEmpty()){
            result = calc.start(line); 
        } else {
            result = calc.start(String.join(" ", Arrays.copyOfRange(parts, 0, parts.length - 2)));
        } 


        if (!result.equals("error")) {
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);

            if (expect.isEmpty()) {
                line += " = " + result;
            } else {
                line += " " + result.equals(expect);
            }
            bw.write(line);

            bw.close();
            fw.close();
        }
        br.close();
        fr.close();
    }
    public static String readerForTest(String path)throws IOException {
        File file = new File(path);
        FullCalculator calc = new FullCalculator();

        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);

        String line = br.readLine();
        String expect = "";
        String[] parts = line.split(" ");
        if (line.contains("=")) {
            if (parts[parts.length - 2].equals("=")) {

                expect = parts[parts.length - 1];
            }
        }
        String result = "";        
        br.close();
        fr.close();
        return line;
    }

}

