import { Asset } from './Asset';
export class Request {
  id: number;
  fromDate: string;
  toDate: string;
  status: string;
  requestedBy: object;
  requestedFor: object;
  requestedAsset: Asset;
}
