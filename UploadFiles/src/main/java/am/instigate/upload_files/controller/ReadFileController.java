package am.instigate.upload_files.controller;

import am.instigate.upload_files.entity.User;
import am.instigate.upload_files.service.ReadFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class ReadFileController {
    @Autowired
    private ReadFileService readFileService;
    @GetMapping(value = "/")
    public String home(Model model){
        model.addAttribute("user", new User());
        List<User> users = readFileService.findAll();
        model.addAttribute("users",users);
        return "view/users";
    }
    @PostMapping(value = "/fileupload")
    public String uploadFile(@ModelAttribute User user, RedirectAttributes redirectAttributes){
        boolean isFlag = readFileService.saveDataFromUploadFile(user.getFile());
        if(isFlag){
            redirectAttributes.addFlashAttribute("successmessage","File Upload Successfully !");
        }else {
            redirectAttributes.addFlashAttribute("errormessage","File Upload not done , Please try again");
        }
        return "redirect:/";
    }

}
