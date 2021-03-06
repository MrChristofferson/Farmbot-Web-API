module Api
  class ImagesController < Api::AbstractController
    include Skylight::Helpers

    BUCKET = ENV.fetch("GCS_BUCKET") { "YOU_MUST_CONFIG_GOOGLE_CLOUD_STORAGE" }
    KEY    = ENV.fetch("GCS_KEY") { "" }
    SECRET = ENV.fetch("GCS_ID") { "" }

    def create
        mutate Images::Create.run({device: current_device}, raw_json)
    end

    instrument_method
    def index
      mutate Images::Fetch.run(device: current_device)
    end

    def show
      render json: image
    end

    def destroy
      render json: image.destroy! && ""
    end

    def storage_auth
      # Creates a 1 hour authorization for a user to upload an image file to a
      # Google Cloud Storage bucket.
      # You probably want to POST that URL to Images#Create after that.
      render json: {
        verb:    "POST",
        url:     "//storage.googleapis.com/#{BUCKET}/",
        form_data: {
          "key"            => random_filename,
          "acl"            => "public-read",
          "Content-Type"   => "image/jpeg",
          "policy"         => policy,
          "signature"      => policy_signature,
          "GoogleAccessId" => KEY,
          "file"           => "REPLACE_THIS_WITH_A_BINARY_JPEG_FILE"
        },
        instructions: "Send a 'from-data' request to the URL provided."\
                      "Then POST the resulting URL as an 'attachment_url' "\
                      "(json) to api/images/."
      }
    end

  private

    def random_filename
      @range ||= "temp1/#{SecureRandom.uuid}.jpg"
    end

    def policy
      @policy ||= Base64.encode64(
        { 'expiration' => 1.hour.from_now.utc.xmlschema,
          'conditions' => [
           { 'bucket'                => BUCKET },
           { 'key'                   => random_filename},
           { 'acl'                   => 'public-read' },
           { 'Content-Type'          => "image/jpeg"},
           ['content-length-range', 1, 7.megabytes]
         ]}.to_json).gsub(/\n/, '')
    end

    def policy_signature
      @policy_signature ||= Base64.encode64(
        OpenSSL::HMAC.digest(OpenSSL::Digest::Digest.new('sha1'),
        SECRET,
        policy)).gsub("\n",'')
    end

    def image
      Image.where(device: current_device).find(params[:id])
    end
  end
end
