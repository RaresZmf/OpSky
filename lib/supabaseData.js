import { supabase } from "./supabaseClient";

export async function retrieveMatchNumber(){
    const {data, error} = await supabase
        .from("FTCData")
        .select('*', { count: 'exact' })
    if(error){
        console.error(error);
    }

    return data[0];
}

export async function retrieveMatchData() {
    const { data, error } = await supabase
        .from("FTCData")
        .select("*")

    if (error) {
        console.error(error);
        return null;
    }

    if (data.length === 0) {
        console.error("No data found");
        return [];
    }

    const matches = data.map(params => ({
        id: params.id,
        cycleTimeTeleop: params.cycle_time || 0,
        distanceTraveled: params.distance || 0,
        parked: params.parked || -1,
        specimens: params.specimens || 0,
        samples: params.samples || 0,
        hits: params.hits || 0,
        movementEfficiency: params.movementEfficiency || 0,
        cycleTimeAuto: params.cycle_time_auton || 0,
        transferTime: params.transfer_time || 0,
        detectionTime: params.detectionTime || 0,
        extendoMotorTimeForward: params.extendoMotorTimeForward || 0,
        extendoMotorAmpForward: params.extendoMotorAmpsForward || 0,
        extendoMotorTimeRetract: params.extendoTimeRetract || 0,
        extendoMotorAmpRetract: params.extendoAmpsRetract || 0,
        liftMotorTimeUp: params.liftMotorTimeUp || 0,
        liftMotorAmp: params.liftMotorAmpsUp || 0,
        liftMotorTimeDown: params.liftMotorTimeDown || 0,
        liftMotorAmpDown: params.liftMotorAmpsDown || 0,
        officialMatch: params.official_match || false,
        autoS: params.num_specimene_auton || 0,
        autoP: params.num_sample_auton || 0,
        clutchEngage: params.clutch_engage_time || 0,
        intakeVertical: params.vertical_cleste || 0,
        intakeRotation: params.rotatie_cleste || 0,
        intakeClawTime: params.timp_cleste || 0,
        outtakeTime: params.rotatie_outtake || 0,
        chassisAmps: params.chassisAmps || 0,
        driverScore: params.driver_score || 0,
        transferEfficiency: params.transfer_efficiency || 0,
        matchName: params.matchName || ""
    }));

    return matches;
}

export async function uploadMatchData(matchData){
    const {
        cycleTimeTeleop,
        distanceTraveled,
        parked,
        specimens,
        samples,
        hits,
        movementEfficiency,
        cycleTimeAuto,
        transferTime,
        detectionTime,
        extendoMotorTimeForward,
        extendoMotorAmpForward,
        liftMotorTimeUp,
        liftMotorAmp,
        extendoMotorTimeRetract,
        extendoMotorAmpRetract,
        liftMotorTimeDown,
        liftMotorAmpDown,
        officialMatch,
        matchName,
        autoP,
        autoS
    } = matchData;
    
    const { data, error } = await supabase
    .from('FTCData')
    .insert([
    { cycle_time: cycleTimeTeleop, distance: distanceTraveled, parked: parked, specimens: specimens, samples: samples, hits: hits, transfer_time: transferTime, detectionTime: detectionTime, extendoMotorTimeForward: extendoMotorTimeForward, extendoMotorAmpsForward: extendoMotorAmpForward, extendoTimeRetract:extendoMotorTimeRetract, extendoAmpsRetract: extendoMotorAmpRetract, liftMotorTimeUp: liftMotorTimeUp, liftMotorAmpsUp: liftMotorAmp, liftMotorTimeDown: liftMotorTimeDown, liftMotorAmpsDown: liftMotorAmpDown, official_match: officialMatch, matchName: matchName, num_specimene_auton: autoS, num_sample_auton: autoP },
    ])
    .select()    

    if(error){
        console.log(error);
    }
    console.log(data);
}

