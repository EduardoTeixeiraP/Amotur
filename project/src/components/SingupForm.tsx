'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Mínimo de 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    phone: z
      .string()
      .min(10, 'Telefone muito curto')
      .max(15, 'Telefone muito longo')
      .regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, 'Telefone inválido'),
    password: z.string().min(6, 'Mínimo de 6 caracteres')
    .regex(/[A-Z]/, 'A senha deve ter ao menos uma letra maíscula!'),
    confirm: z.string(),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: 'Você precisa aceitar os termos' }),
    // }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'As senhas não coincidem',
    path: ['confirm'],
  });

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    alert('Cadastro enviado com sucesso!');
  };

  return (
    <div className="bg-[#1e1e35] text-white p-10 rounded-2xl w-full max-w-sm shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="username"
            {...register('name')}
            className="w-full bg-[#2a2a47] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            className="w-full bg-[#2a2a47] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="(11) 91234-5678"
            {...register('phone')}
            className="w-full bg-[#2a2a47] text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.phone && <p className="text-sm text-red-400 mt-1">{errors.phone.message}</p>}
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            {...register('password')}
            className="w-full bg-[#2a2a47] text-white placeholder-gray-400 px-4 py-3 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-300 hover:text-white"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
          {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
        </div>

        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirmar senha"
            {...register('confirm')}
            className="w-full bg-[#2a2a47] text-white placeholder-gray-400 px-4 py-3 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-300 hover:text-white"
          >
            {showConfirm ? 'Ocultar' : 'Mostrar'}
          </button>
          {errors.confirm && <p className="text-sm text-red-400 mt-1">{errors.confirm.message}</p>}
        </div>

        {/* <div className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            id="terms"
            {...register('terms')}
            className="mt-1 accent-green-400"
          />
          <label htmlFor="terms" className="text-gray-300">
            Ao se cadastrar, você aceita os{' '}
            <a href="#" className="text-green-400 hover:underline">Termos de serviço</a> e a{' '}
            <a href="#" className="text-green-400 hover:underline">Política de privacidade</a>.
          </label>
        </div>
        {errors.terms && <p className="text-sm text-red-400">{errors.terms.message}</p>} */}

        <button
          type="submit"
          className="w-full bg-green-400 hover:bg-green-500 transition text-[#1e1e35] font-semibold py-3 rounded-lg"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-400">
        Já possui uma conta?{' '}
        <a href="/user/sigin" className="text-green-400 hover:underline">Sign In</a>
      </p>
    </div>
  );
}
