import { TeaHouse } from '../entity/tea-house';

export interface TeaHouseRepository {
  save(manager: TeaHouse): Promise<TeaHouse>;
  findById(): Promise<TeaHouse>;
}
