package am.instigate.upload_files.repository;

import am.instigate.upload_files.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReadFileRepository extends CrudRepository<User, Long> {
}
