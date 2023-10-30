<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Applicant;


class ApplicantControlLer extends Controller
{
    public function store(Request $request)
    {
        $applicant = new Applicant();
        $applicant->name = $request->input('name');
        $applicant->email = $request->input('email');
        $applicant->phone = $request->input('phone');
        $applicant->home = $request->input('home');
        $applicant->save();
       

        //return $mensaje;
        return response()->json($applicant);
        /*return response()->json(
            array ( 'data' => $mensaje,
                    'code' => '200',
                    'msj' => ''
        ));*/
    }

}
