<?php

namespace App\Http\Controllers;

use App\Http\Traits\PresenceTrait;
use App\Models\Beacon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BeaconController extends Controller
{
    use PresenceTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $beacons = ['data' => DB::table('beacons')->get()];
        return $beacons;
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
        $beacon = new Beacon();

        if ($beacon::create($request->all())) {
            return response()->json(
                ['message' => 'Data berhasil ditambahkan!'],
                201
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Beacon  $beacon
     * @return \Illuminate\Http\Response
     */
    public function show(Beacon $beacon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Beacon  $beacon
     * @return \Illuminate\Http\Response
     */
    public function edit(Beacon $beacon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Beacon  $beacon
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Beacon $beacon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Beacon  $beacon
     * @return \Illuminate\Http\Response
     */
    public function destroy(Beacon $beacon)
    {
        //
    }

    public function searchClassAndSchedule(Request $request)
    {
        $validated_schedule = $this->validateSchedule($request);
        return response()->json(
            [
                "data" => $validated_schedule->original,
            ],
            200
        );
    }
}
