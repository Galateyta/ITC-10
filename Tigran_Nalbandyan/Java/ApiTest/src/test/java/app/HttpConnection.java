package app;

import java.io.IOException;
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

            System.out.println("Response : " + response);

            scan.close();

            obj = new JSONObject("{\"response\": " + response + " }");

            JSONArray arr = obj.getJSONArray("response");
            for (int i = 0; i < arr.length(); i++) {

                String id = arr.getJSONObject(i).getString("id");
                String employee_name = arr.getJSONObject(i).getString("employee_name");
                String employee_salary = arr.getJSONObject(i).getString("employee_salary");
                String employee_age = arr.getJSONObject(i).getString("employee_age");
                String profile_image = arr.getJSONObject(i).getString("profile_image");

//                System.out.println("id : " + id);
//                System.out.println("employee_name : " + employee_name);
//                System.out.println("employee_salary : " + employee_salary);
//                System.out.println("employee_age : " + employee_age);
//                System.out.println("profile_image : " + profile_image);

            }

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

            System.out.println("status : " + conn.getResponseCode());

            System.out.println("Response : " + response);

            scan.close();

            employee = new JSONObject(response);

            String employe_id = employee.getString("id");
            String employee_name = employee.getString("employee_name");
            String employee_salary = employee.getString("employee_salary");
            String employee_age = employee.getString("employee_age");
            String profile_image = employee.getString("profile_image");

            System.out.println("id : " + employe_id);
            System.out.println("employee_name : " + employee_name);
            System.out.println("employee_salary : " + employee_salary);
            System.out.println("employee_age : " + employee_age);
            System.out.println("profile_image : " + profile_image);


            conn.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        }
        return employee;
    }

    public String deleteEmployee(String id) {
        String response = "error";
        try {
            URL url = new URL("http://dummy.restapiexample.com/api/v1/delete/" + id);
            System.out.println(url.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("DELETE");
            conn.setRequestProperty("Accept", "application/json");

            Scanner scan = new Scanner(url.openStream());
            response = new String();
            while (scan.hasNext())
                response += scan.nextLine();

            System.out.println("status : " + conn.getResponseCode());

            System.out.println("Response : " + response);

//            if (conn.getResponseCode() != 200) {
//                throw new RuntimeException(" HTTP error code : " + conn.getResponseCode());
//            }

            scan.close();

            conn.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        }
        return response;
    }
}
