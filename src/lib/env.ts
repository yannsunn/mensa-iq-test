// 環境変数管理ユーティリティ
// Next.js App RouterとVercelで確実に環境変数を読み込むため

export function getEnvVariable(key: string): string | undefined {
  // 複数の方法で環境変数を取得
  const value = process.env[key] || 
                process.env[`${key}`] || 
                (typeof window === 'undefined' ? undefined : (window as unknown as { env?: Record<string, string> }).env?.[key]);
  
  if (!value && typeof window === 'undefined') {
    console.warn(`[ENV] Variable ${key} not found in server environment`);
  }
  
  return value;
}

export function getRequiredEnvVariable(key: string): string {
  const value = getEnvVariable(key);
  
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  
  return value;
}

// 環境変数の初期化とチェック
export function initializeEnv() {
  console.log('[ENV] Initializing environment variables...');
  
  const requiredVars = ['STABILITY_API_KEY'];
  const optionalVars = ['IMAGINE_API_KEY', 'NEXT_PUBLIC_ENABLE_IMAGE_GENERATION'];
  
  const status = {
    required: {} as Record<string, boolean>,
    optional: {} as Record<string, boolean>
  };
  
  // 必須環境変数のチェック
  for (const varName of requiredVars) {
    const value = getEnvVariable(varName);
    status.required[varName] = !!value;
    if (!value) {
      console.error(`[ENV] Required variable ${varName} is missing!`);
    } else {
      console.log(`[ENV] ${varName} is set (length: ${value.length})`);
    }
  }
  
  // オプション環境変数のチェック
  for (const varName of optionalVars) {
    const value = getEnvVariable(varName);
    status.optional[varName] = !!value;
    console.log(`[ENV] ${varName}: ${value ? 'set' : 'not set'}`);
  }
  
  return status;
}

// Vercel環境かどうかをチェック
export function isVercelEnvironment(): boolean {
  return !!(process.env.VERCEL || process.env.VERCEL_ENV);
}

// 開発環境かどうかをチェック
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

// プロダクション環境かどうかをチェック
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}