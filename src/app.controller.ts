import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamCall } from '@nestjs/microservices';
import { interval, map, Observable, take } from 'rxjs';

@Controller()
export class AppController {
  @GrpcMethod('HelloService', 'TestStreamServer')
  testStreamServer(): Observable<{ str: string }> {
    return interval(1000).pipe(
      map((val) => ({ str: `Message number ${val}` })),
      take(10),
    );
  }

  @GrpcStreamCall('HelloService', 'TestStreamClient')
  testStreamClient(
    requestStream: any,
    callback: (err: unknown, value: any) => void,
  ) {
    requestStream.on('data', (e: any) => console.log('data', e));
    requestStream.on('end', () => callback(null, { message: 'ok' }));
  }
}
