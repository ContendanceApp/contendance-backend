<?php

namespace App\Http\Controllers;

use App\Http\Traits\PresenceTrait;
use App\Models\Presence;
use App\Models\PresencesDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PresencesDetailController extends Controller
{
    use PresenceTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $presence_detail = new PresencesDetail();
        $validated_data = $this->validatePresence($request);

        $presence_time = Carbon::now();

        if (!is_null($validated_data)) {
            if (
                $presence_detail::create([
                    'presence_id' =>
                        $validated_data->original['presence_detail']
                            ->presence_id,
                    'user_id' => $validated_data->original['lecturer']->user_id,
                    'presence_time' => $presence_time,
                    'is_inclass' => true,
                ])
            ) {
                return response()->json(
                    [
                        'message' => 'Presensi berhasil!',
                        'data' => $validated_data->original,
                    ],
                    201
                );
            }
        } else {
            return response()->json(
                [
                    'message' => $validated_data->original['message'],
                ],
                404
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PresencesDetail  $presencesDetail
     * @return \Illuminate\Http\Response
     */
    public function show(PresencesDetail $presencesDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PresencesDetail  $presencesDetail
     * @return \Illuminate\Http\Response
     */
    public function edit(PresencesDetail $presencesDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PresencesDetail  $presencesDetail
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PresencesDetail $presencesDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PresencesDetail  $presencesDetail
     * @return \Illuminate\Http\Response
     */
    public function destroy(PresencesDetail $presencesDetail)
    {
        //
    }
}
