<?php

//namespace App\Http\Controllers\API;

//use App\User;
//use Illuminate\Http\Request;
//use App\Http\Controllers\Controller;
//use Illuminate\Support\Facades\Mail;
//use App\Mail\UserCreate;

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{

    public function index()
    {
        $usuarios = User::all();

        //return $usuarios;
        return response()->json($usuarios);
        /*return response()->json(
            array ( 'data' => $usuarios,
                    'code' => '200',
                    'msj' => ''
        ));*/
    }


    public function store(Request $request)
    {
//        dd($request->input('name'));
//        exit;
        $request->validate(['email' => 'required|email|unique:users', 
                            'name' => 'required', 
                            'password' => 'required|min:8']);

        $usuario = new User();
        $usuario->name = $request->input('name');
        $usuario->email = $request->input('email');
        $usuario->password = Hash::make($request->input('password'));

        $usuario->save();

    /*    $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        Mail::to($request->input('email'))->send(new UserCreate($data));
*/
        //return $usuario;
        return response()->json($usuario);
    }


    public function show($id)
    {
        $usuario = User::find($id);

        //return $usuario;
        //return response()->json($usuario);
        /*return response()->json(
            array ( 'data' => $usuario,
                    'code' => '200',
                    'msj' => ''
        ));*/
    }


    public function update(Request $request, $id)
    {

        $usuario = User::find($id);

        $data = request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$usuario->id,
        ]);

        $usuario->name = $request->input('name');
        $usuario->email = $request->input('email');
        $usuario->password = Hash::make($request->input('password'));

        $usuario->save();

        return $usuario;
       //return response()->json($usuario);
    }


    public function destroy($id)
    {
        User::destroy($id);

        return "Usuario eliminado";
    }
}
