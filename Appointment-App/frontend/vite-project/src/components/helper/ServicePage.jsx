import React from "react";
import Services from "./Services";

const ServicePage = () => {
  return (
    <div
      className="mt-30 px-4 lg:px-12 py-10 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url(/b.jpg)" }}
    >
      <div className="relative z-10">
        <h1 className="text-4xl  text-green-600 text-center mb-10 tracking-wide">
          Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Services
            src="/Services/ECG.png"
            name="ECG"
            description="An electrocardiogram (ECG or EKG) is a simple, non-invasive test that records the electrical activity of the heart, helping doctors diagnose and monitor various heart conditions"
          />
          <Services
            src="/Services/Echo.jpeg"
            name="ECHO"
            description="An electrocardiogram (ECG or EKG) is a simple, non-invasive test that records the electrical activity of the heart, helping doctors diagnose and monitor various heart conditions"
          />
          <Services
            src="/Services/TMT.jpeg"
            name="TMT"
            description="A TMT (Treadmill Test), also known as an exercise stress test or cardiac stress test, is a diagnostic procedure in cardiology that assesses how well your heart functions under controlled stress, typically induced by exercise on a treadmill."
          />
          <Services
            src="/Services/PaedraticEcho.jpeg"
            name="Pediatric Echo"
            description="Pediatric echocardiography, or pediatric echo, is a specialized ultrasound examination used to evaluate the structure and function of a child's heart, aiding in the diagnosis and monitoring of congenital and acquired heart conditions."
          />
          <Services
            src="/Services/Holtermonitor.jpeg"
            name="Holter Monitor"
            description="A Holter monitor is a portable electrocardiogram (ECG) that continuously records a person's heart's electrical activity for 24 to 48 hours, or longer, to detect and diagnose irregular heartbeats (arrhythmias) and other heart conditions"
          />
          <Services
            src="/Services/Angiography.jpeg"
            name="Angiography"
            description="Angiography is an X-ray imaging technique that uses a special dye to examine blood vessels. It can help diagnose and treat blood vessel conditions. "
          />
          <Services
            src="/Services/Angioplasty.jpeg"
            name="Angioplasty"
            description="Angioplasty is a minimally invasive procedure, also known as percutaneous coronary intervention (PCI), used to widen narrowed or blocked arteries, typically to treat arterial atherosclerosis, and restore blood flow"
          />
          <Services
            src="/Services/Pacemakerimplantation.jpeg"
            name="PaceMaker Implantation"
            description="Pacemaker implantation is a procedure where a small electronic device, a pacemaker, is surgically placed under the skin in the chest to regulate a slow or irregular heartbeat, using electrical pulses to stimulate the heart"
          />
          <Services
            src="/Services/Baloonvalvuloplasty.jpeg"
            name="Baloon Valvuloplasty"
            description="Balloon valvuloplasty, also known as balloon valvotomy, is a minimally invasive procedure used to treat narrowed (stenotic) heart valves by inserting a catheter with a balloon to open the valve and improve blood flow"
          />
          <Services
            src="/Services/Deviceclosure.jpeg"
            name="ASD/VSD/PDA/Device Closure"
            description="Device closure is a minimally invasive procedure to repair congenital heart defects like Atrial Septal Defect (ASD), Ventricular Septal Defect (VSD), and Patent Ductus Arteriosus (PDA) using a catheter and a device to close the abnormal opening, offering a less invasive alternative to traditional open-heart surgery"
          />
          <Services
            src="/Services/PeripheralVascularIntervention.jpeg"
            name="Peripheral Vascular Intervention"
            description="Peripheral vascular interventions are interventional cardiology treatments that use a flexible, hollow tube (catheter) to access blood vessels outside the heart. We use these techniques to open blocked blood vessels, remove blood clots and even lower high blood pressure."
          />

          <Services
            src="/Services/CathederAblation.jpeg"
            name="Catheder Ablation"
            description="Catheter ablation is a minimally invasive procedure used to treat abnormal heart rhythms (arrhythmias) by using a catheter to access the heart and destroy or disrupt the abnormal tissue causing the arrhythmia, often using heat or cold. "
          />
          <Services
            src="/Services/PreventiveHealthCheck-up.jpeg"
            name="Preventive Health Check-up"
            description="Preventive health check-ups are crucial for early disease detection and promoting overall well-being, encompassing various tests like blood glucose, lipid profile, and screenings for conditions like heart disease, cancer, and osteoporosis. 
        "
          />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
