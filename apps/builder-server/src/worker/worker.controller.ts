import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { WorkerService } from "./worker.service";
import { WorkerControllerBase } from "./base/worker.controller.base";

@swagger.ApiTags("workers")
@common.Controller("workers")
export class WorkerController extends WorkerControllerBase {
  constructor(
    protected readonly service: WorkerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
