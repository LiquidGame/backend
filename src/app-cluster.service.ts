import * as os from 'os';
import { Injectable } from '@nestjs/common';
import cluster from 'cluster';

const numCPUs = os.cpus().length;

@Injectable()
export class AppClusterService {
  static clusterize(callback: any): void {
    if (cluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
