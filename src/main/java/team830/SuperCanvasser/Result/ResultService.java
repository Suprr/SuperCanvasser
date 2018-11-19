package team830.SuperCanvasser.Result;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultService implements ResultInterface{
    @Autowired
    ResultRepo resultRepo;

    public Result createResult(Result result){
        return resultRepo.insert(result);
    }


}
