import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.join(__dirname, 'hello.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const { HelloService } = protoDescriptor.hello;

const client = new HelloService(
  'localhost:3000',
  grpc.credentials.createInsecure(),
);

async function testClientStreaming() {
  const call = client.TestStreamClient((error, response) => {
    if (error) {
      console.error('error:', error);
    } else {
      console.log('server response:', response);
    }
  });
  call.write({ message: 'First message' });
  call.write({ message: 'Second message' });
  call.write({ message: 'Third message' });
  call.end();
}

testClientStreaming();
