package com.instigate.app;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Scanner;

public class ApiClass {

    public int getRequest() throws IOException {

        URL url = new URL("http://dummy.restapiexample.com/api/v1/employees");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/json");
        conn.disconnect();
        return conn.getResponseCode();

    }

    public JSONObject getByID(int id) throws IOException {

        URL url = new URL("http://dummy.restapiexample.com/api/v1/employee/" + id);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/json");

        Scanner scan = new Scanner(url.openStream());
        String entireResponse = new String();
        while (scan.hasNext()) {
            entireResponse += scan.nextLine();
        }

        scan.close();

        JSONObject obj = new JSONObject(entireResponse);

        conn.disconnect();
        return obj;
    }

    public JSONObject addEmploy(JSONObject employ) throws IOException {
        URL url = new URL("http://dummy.restapiexample.com/api/v1/create");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
        System.out.println(employ);
        wr.write(employ.toString());

        System.out.println( "ssssss"+ conn.getResponseMessage());
        Scanner scan = new Scanner(url.openStream());
        String entireResponse = new String();
        while (scan.hasNext()) {
            entireResponse += scan.nextLine();
        }

        scan.close();

        JSONObject obj = new JSONObject(entireResponse);

        conn.disconnect();
        return obj;
    }
}
