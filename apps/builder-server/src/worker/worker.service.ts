import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { WorkerServiceBase } from "./base/worker.service.base";

@Injectable()
export class WorkerService extends WorkerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
