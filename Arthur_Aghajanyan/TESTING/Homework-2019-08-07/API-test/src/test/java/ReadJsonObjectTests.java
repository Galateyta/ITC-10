import java.io.IOException;
import org.everit.json.schema.Schema;
import org.everit.json.schema.ValidationException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.junit.Assert;
import org.junit.Test;
import requestClass.*;

public class ReadJsonObjectTests {
    @Test
    public void correctIdGetRequest() {
        try{
            JSONObject obj = RequestClass.getRequest(15911);
            Assert.assertTrue("Response is null", obj != null);
            try {
                JSONObject jsonSchema = new JSONObject(
                        new JSONTokener(RequestClass.class.getResourceAsStream("/schema.json")));
                    Schema schema = SchemaLoader.load(jsonSchema);
                schema.validate(obj);
                }
            catch (ValidationException ex){
                Assert.fail("Throw validation Exception");
            }
        }catch (IOException ex){
            Assert.fail("Throw IO Exception");
        }
    }

    @Test
    public void incorrectIdGetRequest() {
        try{
            JSONObject obj = RequestClass.getRequest(1581);
            Assert.assertTrue("Response is null", obj != null);
            try {
                JSONObject jsonSchema = new JSONObject(
                        new JSONTokener(RequestClass.class.getResourceAsStream("/schema.json")));
                Schema schema = SchemaLoader.load(jsonSchema);
                schema.validate(obj);
            }
            catch (ValidationException ex){
                Assert.fail("Throw validation Exception");
            }
        }catch (IOException ex){
            Assert.fail("Throw IO Exception");
        }
    }
    @Test
    public void correctIdUpdateRequest() {
        JSONObject putElementParametr = new JSONObject();
        putElementParametr.put("name","auuuoaaaaa");
        putElementParametr.put("salary","1123");
        putElementParametr.put("age","23");
        JSONObject obj = null;
        try{
            obj = RequestClass.updateRequestApi(3, putElementParametr);
            Assert.assertTrue("Response is null", obj != null);
            try {
                JSONObject jsonSchema = new JSONObject(
                        new JSONTokener(RequestClass.class.getResourceAsStream("/putSchema.json")));
                Schema schema = SchemaLoader.load(jsonSchema);
                schema.validate(obj);
            }
            catch (ValidationException ex){
                Assert.fail("Throw validation Exception");
            }
        }catch (IOException ex){
            Assert.fail("Throw IO Exception");
        }
        Assert.assertTrue("diff", putElementParametr.toString().equals(obj.toString()));
    }
}


