package am.instigate.upload_files.service;

import am.instigate.upload_files.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ReadFileService {
    List<User> findAll();

    boolean saveDataFromUploadFile(MultipartFile file);
}
