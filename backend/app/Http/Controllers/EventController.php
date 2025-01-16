<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::where('user_id', auth()->user()->id)
                    ->with('user')        
                    ->orderBy('created_at','desc')->paginate(10);
        return response()->json($events);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
                'description' => 'required|string|max:255',
                'start_time' => 'required|date|after_or_equal:now',
                'end_time' => 'required|date|after:start_time',
        ],[
                'start_time.after_or_equal' => 'A data de início deve ser hoje ou uma data futura.',
                'end_time.after' => 'A data de término deve ser posterior à data de início.',
                'description.required' => 'A descrição do evento é obrigatória.'
        ]);



        $conflict = Event::where('user_id', auth()->user()->id)
                    ->where(function($query) use ($validated) {
                        $query->whereBetween('start_time', [$validated['start_time'], $validated['end_time']])
                        ->orWhereBetween('end_time', [$validated['start_time'], $validated['end_time']])
                        ->orWhere(function ($query) use ($validated) {
                            $query->where('start_time', '<=', $validated['start_time'])
                                  ->where('end_time', '>=', $validated['end_time']);
                        });
                    })->exists();

        if ($conflict) {
            return response()->json(['messagem' => "Este evento se sobrepõe a um evento existente."], 409);
        }

        $event = Event::create(array_merge($validated, 
        ['user_id' => auth()->id()]));

        return response()->json($event, 201);    
    }

    public function show(string $id)
    {
        $event = Event::where('id', $id)->where('user_id', '=', auth()->user()->id)->firstOrFail();
        return response()->json($event);
    }


    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'description' => 'sometimes|required|string|max:255',
            'start_time' => 'sometimes|required|date|after_or_equal:now',
            'end_time' => 'sometimes|required|date|after_or_equal:start_time'
        ],[
            'start_time.after_or_equal' => 'A data de início deve ser hoje ou uma data futura.',
            'end_time.after' => 'A data de término deve ser posterior à data de início.',
            'description.required' => 'A descrição do evento é obrigatória.'
    ]);

        $conflict = Event::where('user_id', auth()->user()->id)
                    ->where('id', '!=', $id)
                    ->where(function($query) use ($validated) {
                        $query->whereBetween('start_time', [$validated['start_time'], $validated['end_time']])
                        ->orWhereBetween('end_time', [$validated['start_time'], $validated['end_time']])
                        ->orWhere(function ($query) use ($validated) {
                            $query->where('start_time', '<=', $validated['start_time'])
                                  ->where('end_time', '>=', $validated['end_time']);
                        });
                    })->exists();

        if ($conflict) {
            return response()->json(['messagem' => "Este evento se sobrepõe a um evento existente."], 409);
        }

        $event = Event::where('id', $id)
            ->where('user_id', '=', auth()->user()->id)
            ->firstOrFail();

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(string $id)
    {
        $event = Event::where('id', $id)
        ->where('user_id', '=', auth()->user()->id)
        ->firstOrFail();
        $event->delete();

        return response()->json(null, 204);
    }
}
