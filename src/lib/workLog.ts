import {getConnection, getRepository} from "typeorm";
import WorkHistory from "../database/entity/WorkHistory";

const saveWorkLog = async (workType: string) => {
  try {
    const workHistoryRepository = getRepository(WorkHistory);

    const workHistory = new WorkHistory();

    workHistory.userId = 'jeffchoi';
    workHistory.workType = workType;
  
    await workHistoryRepository.save(workHistory);
  } catch (error) {
    console.error(`saveWorkLog중 에러 발생...`);
    console.error(`Error Message: ${error.message}`);
  }
};

export {
  saveWorkLog,
};
