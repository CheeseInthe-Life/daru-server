import { TeaHouse } from '../entity/tea-house';

export interface TeaHouseRepository {
  store(teaHouse: TeaHouse): Promise<TeaHouse>;
  findById(id: string): Promise<TeaHouse>;
  findAll(): Promise<TeaHouse[]>;
}
