# mtls-envoy
a simple application + envoy sidecar configuration for setting up mtls

## preliminary findings
- envoy cannot handle egress traffic natively to perform mtls between proxies, in order to get around this the client service has to effectively hit its envoy proxy with the server's listener and cluster defined on the client's envoy configuration (refer to this [link](https://github.com/dnivra26/envoy_servicemesh) for more information)

## generating the certs
**passphrase is 1234**
### certificate authority
generate the private key of the ca
```bash
openssl genrsa -des3 -out ca.key 2048
```

generate the certificate of the ca
```bash
openssl req -x509 -new -nodes -key ca.key -sha256 -days 1825 -out ca.pem
```

**NOTE: the ca cert used in `envoy.yaml` could not validate the client cert that it generated**

### client
generate the private key of the client
```bash
openssl genrsa -out client.key 2048
```

generate the cerification generation request
```bash
openssl req -new -key client.key -out client.csr
```

generate the client certificate
```bash
openssl x509 -req -in client.csr -CA ../ca/ca.pem -CAkey ../ca/ca.key -CAcreateserial \
-out client.crt -days 1825 -sha256
```

### server
generate the private key of the server
```bash
openssl genrsa -out server.key 2048
```

generate the cerification generation request
```bash
openssl req -new -key server.key -out server.csr
```

generate the server certificate
```bash
openssl x509 -req -in server.csr -CA ../ca/ca.pem -CAkey ../ca/ca.key -CAcreateserial \
-out server.crt -days 1825 -sha256
```
