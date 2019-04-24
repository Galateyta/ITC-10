package am.instigate.upload_files.service;

import am.instigate.upload_files.entity.User;
import am.instigate.upload_files.repository.ReadFileRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class ReadFileServiceImpl implements ReadFileService {
    @Autowired
    private ReadFileRepository readFileRepository;

    @Override
    public List<User> findAll() {
        return (List<User>) readFileRepository.findAll();
    }

    @Override
    public boolean saveDataFromUploadFile(MultipartFile file) {
        boolean isFlag = false;
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if(extension.equalsIgnoreCase("json")){
            isFlag = readDataFromJson(file);
        }else if(extension.equalsIgnoreCase("csv")){
            isFlag = readDataFromCsv(file);
        }
        return isFlag;
    }

    private boolean readDataFromCsv(MultipartFile file) {
        try {
            InputStreamReader reader = new InputStreamReader(file.getInputStream());
            CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build();
            List<String[]> rows = csvReader.readAll();
            for (String[] row : rows) {
                readFileRepository.save(new User(row[0],row[1], Integer.parseInt(row[2]), row[3], row[4], row[5], row[6], row[7],FilenameUtils.getExtension(file.getOriginalFilename())));
            }
            return true;
        } catch (IOException e) {
            return false;

        }
    }

    private boolean readDataFromJson(MultipartFile file) {
        try {
            InputStream inputStream = file.getInputStream();
            ObjectMapper objectMapper = new ObjectMapper();
            List<User> users = Arrays.asList(objectMapper.readValue(inputStream, User[].class));
            if(users != null && users.size() > 0){
                for (User user: users) {
                    user.setFileType(FilenameUtils.getExtension(file.getOriginalFilename()));
                    readFileRepository.save(user);
                }
            }
            return true;
        } catch (IOException e) {
            return false;
        }
    }
}
