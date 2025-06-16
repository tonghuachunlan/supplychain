declare module 'alipay-sdk' {
  interface AlipayConfig {
    appId: string;
    privateKey: string;
    encryptKey?: string;
    alipayPublicKey: string;
  }

  interface AlipaySDK {
    exec(method: string, params?: any, options?: any): Promise<any>;
  }

  const AlipaySdk: {
    new (config: AlipayConfig): AlipaySDK;
  };

  export default AlipaySdk;
}

declare module 'alipay-sdk/lib/form' {
  class AlipayFormData {
    setMethod(method: string): void;
    addField(name: string, value: any): void;
  }
  export default AlipayFormData;
} 