<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mensajes = Message::all();

        return $mensajes;
        //return response()->json($mensajes);
        /*return response()->json(
            array ( 'data' => $mensajes,
                    'code' => '200',
                    'msj' => ''
        ));*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*var_dump($request);
        exit;*/
        $mensaje = new Message();
        $mensaje->user = $request->input('user');
        $mensaje->message = $request->input('message');
        $mensaje->latitude = $request->input('lat');
        $mensaje->longitude = $request->input('lng');
        $mensaje->photo = $request->input('photo');
        $mensaje->save();

        $data = [
            'user' => $request->input('user'),
            'message' => $request->input('message'),
        ];

        //return $mensaje;
        return response()->json($mensaje);
        /*return response()->json(
            array ( 'data' => $mensaje,
                    'code' => '200',
                    'msj' => ''
        ));*/
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
