package com.instigate.app;

import org.everit.json.schema.Schema;
import org.everit.json.schema.ValidationException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import java.io.IOException;


public class ApiTest {
    private void  validate(JSONObject jsonObject) throws ValidationException{
        JSONObject jsonSchema = new JSONObject(
                new JSONTokener(ApiClass.class.getResourceAsStream("/schema.json")));

        Schema schema = SchemaLoader.load(jsonSchema);

            schema.validate(jsonObject);

    }

    ApiClass object = new ApiClass();


    @Test
    public void getRequestTesting()  {
        int status = 0;
        try {
            status = object.getRequest();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Assert.assertEquals("Status code is not 200",200,status);

    }

    @Test
    public void getEmployByIdPositive() throws IOException {

            JSONObject jsonObject = object.getByID(38710);
        try {
            validate(jsonObject);
        }catch (ValidationException e){
            Assert.fail("Validation exeption ");
        }
        System.out.println(jsonObject);
        Assert.assertFalse("Status code is not 200",jsonObject.equals(null));

    }
    @Test
    public void postEmploy(){
        JSONObject employ = new JSONObject();
        employ.put("name","Valod");
        employ.put("age","23");
        employ.put("salary","4000");
        JSONObject obj = null;
        try {
             obj = object.addEmploy(employ);
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("ssssssssaaaaaaaaaaa"+obj);
        Assert.assertFalse("Status code is not 200",obj.equals(null));

    }


}
