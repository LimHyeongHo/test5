import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';

const backgroundImgUrl = "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2600";

const DB_NAME = "PKI_KeyStore";
const STORE_NAME = "privateKeys";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [role, setRole] = useState('ROLE_BUYER');
  const [agree, setAgree] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [regCi, setRegCi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('pki_device_id');
    if (!deviceId) {
      deviceId = 'dev-' + crypto.randomUUID();
      localStorage.setItem('pki_device_id', deviceId);
    }
    return deviceId;
  };

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const savePrivateKey = async (userId, key) => {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(key, userId.trim());
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  };

  const generateKeyPair = async () => {
    return await window.crypto.subtle.generateKey(
      { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
      true, ["sign", "verify"]
    );
  };

  const exportPublicKey = async (key) => {
    const exported = await window.crypto.subtle.exportKey("spki", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  };

  // 1. 본인인증
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !department) return alert("모든 항목을 입력해주세요.");
    if (password !== passwordConfirm) return alert("비밀번호가 일치하지 않습니다.");
    if (!agree) return alert("이용약관에 동의해주세요.");

    setIsLoading(true);
    try {
      const response = await window.PortOne.requestIdentityVerification({
        storeId: "store-fd77dc69-cea9-4fd9-83c9-9888650fe579",
        channelKey: "channel-key-8ffdf987-acaa-40a7-bac8-c8000aab12f2",
        identityVerificationId: `verif-${Date.now()}`
      });

      if (response.code !== undefined) throw new Error(response.message);

      const verifyRes = await fetch('http://localhost:8080/api/pki/verify-portone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identityVerificationId: response.identityVerificationId })
      });

      if (!verifyRes.ok) throw new Error("서버 검증 실패");

      const result = await verifyRes.json();
      if (!result.ci) throw new Error("CI 정보가 없습니다.");

      setRegCi(result.ci);
      setIsVerified(true);
      alert(`✨ ${result.name}님 본인인증이 완료되었습니다! 회원가입 버튼을 눌러주세요.`);
    } catch (e) {
      alert("본인인증 중 오류 발생: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. 회원가입 완료
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isVerified) return alert("본인인증을 먼저 진행해주세요.");

    setIsLoading(true);
    try {
      const keyPair = await generateKeyPair();
      const pubKey = await exportPublicKey(keyPair.publicKey);

      const res = await fetch('http://localhost:8080/api/pki/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          nickname: name,
          role: role,
          ci: regCi,
          publicKey: pubKey,
          deviceId: getDeviceId()
        })
      });

      if (res.ok) {
        await savePrivateKey(email, keyPair.privateKey);
        alert("회원가입이 완료되었습니다! 로그인해주세요.");
        navigate('/login');
      } else {
        const data = await res.json();
        throw new Error(data.error || "회원가입 중 오류 발생");
      }
    } catch (e) {
      alert("오류: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />

      <main
        className="flex-grow flex justify-center items-center bg-cover bg-center p-6 relative"
        style={{ backgroundImage: `url(${backgroundImgUrl})` }}
      >
        <div className="absolute inset-0 bg-radial-gradient from-gray-100/50 via-gray-300/80 to-gray-400/90 mix-blend-multiply"></div>

        <div className="relative z-10 bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100/50 backdrop-blur-sm my-8">

          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
              SECURE SIGNUP
            </p>
            <h1 className="text-4xl font-extrabold text-gray-950">
              회원가입
            </h1>
          </div>

          <form className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-gray-800">이름</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                disabled={isVerified}
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-800">아이디(이메일)</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                disabled={isVerified}
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="department" className="text-sm font-medium text-gray-800">소속 학과 / 전공</label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="컴퓨터소프트웨어공학과"
                disabled={isVerified}
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-800">회원 유형</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('ROLE_BUYER')}
                  disabled={isVerified}
                  className={`p-3.5 rounded-xl border-2 font-bold text-sm transition ${
                    role === 'ROLE_BUYER'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  구매자 (BUYER)
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ROLE_SELLER')}
                  disabled={isVerified}
                  className={`p-3.5 rounded-xl border-2 font-bold text-sm transition ${
                    role === 'ROLE_SELLER'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                      : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  판매자 (SELLER)
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-gray-800">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-800">비밀번호 확인</label>
              <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-base"
              />
            </div>

            <div className="flex items-start gap-3 mt-2 p-1">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
              />
              <label htmlFor="agree" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                <span className="text-blue-600 font-semibold">[필수]</span> YU-BOOK 이용약관 및 개인정보 수집·이용 동의에 동의합니다.
              </label>
            </div>

            {!isVerified ? (
              <button
                type="button"
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full mt-3 p-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition duration-150 active:scale-[0.98] disabled:bg-gray-400"
              >
                {isLoading ? '처리 중...' : '본인인증 실행'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full mt-3 p-4 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-700 transition duration-150 active:scale-[0.98] disabled:bg-gray-400"
              >
                {isLoading ? '처리 중...' : '회원가입 완료'}
              </button>
            )}
          </form>

          <div className="mt-8 text-center text-gray-700 text-sm">
            이미 계정이 있으신가요? <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">로그인하기</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
