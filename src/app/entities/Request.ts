import { Asset } from './Asset';
export class Request {
  id: number;
  requestId: number;
  fromDate: Date;
  toDate: Date;
  status: string;
  requestedBy: object;
  requestedFor: object;
  requestedAsset: Asset;
}
