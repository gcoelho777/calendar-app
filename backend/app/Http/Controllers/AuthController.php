<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {  
            return response()->json(["erros" => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password'=> Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'messagem' => 'Usuário registrado com sucesso!',
            'usuario' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {

        $credentials = $request->only('email','password');

        if(Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
            
            return response()->json([
                'mensagem' => 'Usuario logado com sucesso!',
                'usuario' => $user,
                'token' => $token,
                'auth' => auth()->user()
            ], 200);
        }


        return response()->json(["erro" => "Credenciais Inválidas!"], 401);
    }

    public function show(Request $request) {
        $user = $request->user();

        return response()->json(["usuario" => $user], 200);
    }

    public function update(Request $request) 
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8|confirmed'
        ]);

        if(isset($validated['password']))
        {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json(['messagem' => 'Dados atualizados com sucesso!', 'user' => $user]);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        $user->delete();

        return response()->json(['messagem' => 'Conta excluida com sucesso'], 200);
    }
}
