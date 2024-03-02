<script lang="ts">
  import { onMount } from "svelte";
  import QRCode from "qrcode";
  import QRCodeStyling, {
    DrawType,
    TypeNumber,
    Mode,
    ErrorCorrectionLevel,
    CornerDotType,
  } from "qr-code-styling/lib/qr-code-styling";
  export let value: string = "";
  export let size: string = "";

  let imageURL: string;
  let holder: HTMLElement;

  const options = {
    width: 500,
    height: 500,
    type: "svg" as DrawType,
    data: value,
    image: "/favicon.png",
    margin: 0,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      style: "dots",
      color: "#000",
      type: "dot" as CornerDotType,
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    cornersSquareOptions: {
      color: "#000",
      type: "dot" as CornerDotType,
    },
    cornersDotOptions: {
      color: "#000",
      type: "dot" as CornerDotType,
    },
  };

  const blobToBase64 = (blob): Promise<string> => {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        var dataUrl: any = reader.result;
        // var base64 = dataUrl.split(",")[1];
        resolve(dataUrl);
      };
      reader.readAsDataURL(blob);
    });
  };

  let qrCode: any;
  onMount(async () => {
    qrCode = new QRCodeStyling(options);
    // qrCode.append(holder);
    const imgBlob = await qrCode.getRawData();
    imageURL = await blobToBase64(imgBlob);
    

    // QRCode.toDataURL(value, {
    //   margin:0,
    // })
    //   .then((url) => {
    //     imageURL = url;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  });
</script>

<div class="qr-holder flex justify-center" bind:this={holder}>
  {#if imageURL}
    <img src={imageURL} width={size || `100%`} alt="qrcode" />
  {/if}
</div>

<style lang="postcss" global>
  .qr-holder svg {
  }
</style>
