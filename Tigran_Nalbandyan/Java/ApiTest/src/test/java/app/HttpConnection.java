package app;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

import org.json.JSONArray;
import org.json.JSONObject;


public class HttpConnection {
    public JSONObject getEmployees() {
        JSONObject obj = null;
        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/employees");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException(" HTTP error code : " + conn.getResponseCode());
            }

            Scanner scan = new Scanner(url.openStream());
            String response = new String();
            while (scan.hasNext())
                response += scan.nextLine();

            System.out.println("get employees array status : " + conn.getResponseCode());

            scan.close();

            obj = new JSONObject("{\"response\": " + response + " }");

            JSONArray arr = obj.getJSONArray("response");

            conn.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return obj;
    }

    public JSONObject getEmployee(String id) {
        JSONObject employee = null;
        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/employee/" + id);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException(" HTTP error code : " + conn.getResponseCode());
            }

            Scanner scan = new Scanner(url.openStream());
            String response = new String();
            while (scan.hasNext())
                response += scan.nextLine();

            System.out.println("get employee status : " + conn.getResponseCode());

            try{
                employee = new JSONObject(response);
            } catch(Exception e) {
                employee = new JSONObject("{\"response\" : " + response + "}");
            }

            scan.close();
            conn.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {

            e.printStackTrace();
        }
        return employee;
    }

    public JSONObject deleteEmployee(String id) {
        JSONObject employee = null;
        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/delete/" + id);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded" );
            conn.setRequestMethod("DELETE");
            conn.connect();

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException(" HTTP error code : " + conn.getResponseCode());
            }
            System.out.println("delete response status : " + conn.getResponseCode());

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuffer response = new StringBuffer();
            String readLine = null;
            while ((readLine = in .readLine()) != null) {
                response.append(readLine);
            } in .close();
            employee = new JSONObject(response.toString());

            conn.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return employee;
    }
}
