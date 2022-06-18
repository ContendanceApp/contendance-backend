<?php

namespace App\Http\Controllers;

use App\Http\Traits\PresenceTrait;
use App\Models\Presence;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PresenceController extends Controller
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
        $presence = new Presence();
        $validated_data = $this->validateSchedule($request);

        $input = '19:00:02';
        $date = strtotime($input);
        $open_time = Carbon::now();

        $input = '21:10:00';
        $date = strtotime($input);
        $close_time = null;

        $presence_time = Carbon::now();

        if (
            $presence::create([
                "user_id" => $request->user_id,
                "subject_schedule_id" =>
                    $validated_data->original['subject_schedule']
                        ->subject_schedule_id,
                "room_id" => $validated_data->original['room']->room_id,
                "open_time" => $open_time,
                "close_time" => $close_time,
                "is_open" => true,
                "presence_date" => date('Y-m-d', strtotime($presence_time)),
            ])
        ) {
            return response()->json(
                [
                    'message' => 'Presensi berhasil dibuka!',
                    'data' => $validated_data->original,
                ],
                201
            );
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Presence  $presence
     * @return \Illuminate\Http\Response
     */
    public function show(Presence $presence)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Presence  $presence
     * @return \Illuminate\Http\Response
     */
    public function edit(Presence $presence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Presence  $presence
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Presence $presence)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Presence  $presence
     * @return \Illuminate\Http\Response
     */
    public function destroy(Presence $presence)
    {
        //
    }

    public function getActiveClass($userId)
    {
        // $presence = new Presence();
        // $latestPresence = $presence
        //     ::latest('presence_id')
        //     ->where('user_id', $userId)
        //     ->where('is_open', true)
        //     ->where('close_time', null)
        //     ->with(['room', 'subject_schedule'])
        //     ->first();
        $activeClass = $this->activeClass($userId);

        if ($activeClass != null) {
            return response()->json($activeClass->original, 200);
        } else {
            return response()->json($activeClass, 404);
        }
    }

    public function closeClass(Request $request)
    {
        $presenceId = $request->presence_id;
        $close_time = Carbon::now();

        $presence = new Presence();
        $latestPresence = $presence
            ::find($presenceId)
            ->where('close_time', null)
            ->update(['close_time' => $close_time]);

        if ($latestPresence) {
            return response()->json(
                [
                    'message' => "Kelas berhasil ditutup",
                ],
                200
            );
        }

        return response()->json(
            [
                'message' => "Kelas tidak ditemukan",
            ],
            404
        );
    }

    public function getPresenceHistoryById()
    {
        $presence_detail = new Presence();
        $dateNow = date('Y-m-d', strtotime(Carbon::now()));
        $hitories = $presence_detail
            ::where('user_id', Auth::id())
            ->where('presence_date', $dateNow)
            ->with('room', 'subject_schedule', 'subject_schedule.subject')
            ->latest('created_at')
            ->get();
        return response()->json(['data' => $hitories]);
    }
}
