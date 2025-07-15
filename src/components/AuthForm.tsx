import React, { useState } from 'react';

type Mode = 'login' | 'signup';

interface AuthFormProps {
  mode: Mode;
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, ...(mode === 'signup' ? { name } : {}) });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      {mode === 'signup' && (
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;
