import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WorkerModuleBase } from "./base/worker.module.base";
import { WorkerService } from "./worker.service";
import { WorkerController } from "./worker.controller";
import { WorkerResolver } from "./worker.resolver";

@Module({
  imports: [WorkerModuleBase, forwardRef(() => AuthModule)],
  controllers: [WorkerController],
  providers: [WorkerService, WorkerResolver],
  exports: [WorkerService],
})
export class WorkerModule {}
