import { ManagerByIdCriteria } from '../dto/manager.ciriteria';
import { Manager } from '../entity/manager';

export interface ManagerRepository {
  store(manager: Manager): Promise<Manager>;
  findById(criteria: ManagerByIdCriteria): Promise<Manager>;
}
