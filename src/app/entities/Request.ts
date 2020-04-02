import { Asset } from './Asset';
export interface Request {
  requestId: number;
  fromDate: Date;
  toDate: Date;
  status: string;
  requestedBy: object;
  requestedFor: object;
  requestedAsset: Asset;
}
