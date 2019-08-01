package com.mycompany.app;

import java.io.*;
import java.util.Arrays;

public class Checker {
    public static void main(String[] args) throws IOException {
        System.out.println("line");

        run("/home/student/Desktop/my-app/file.txt");
    }

    public static void run(String path) throws IOException {
        File file = new File(path);
        FullCalculator calc = new FullCalculator();

        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);

        String line = br.readLine();
        System.out.println("line: " + line);
        String expect = "";
        String[] parts = line.split(" ");
        if (line.contains("=")) {
            if (parts[parts.length - 2].equals("=")) {
                expect = parts[parts.length - 1];
            }
        }
        String result;
        if (expect.isEmpty()) {
            result = calc.start(line);
        } else {
            result = calc.start(String.join(" ", Arrays.copyOfRange(parts, 0, parts.length - 2)));
        }

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

        br.close();
        fr.close();
    }
}