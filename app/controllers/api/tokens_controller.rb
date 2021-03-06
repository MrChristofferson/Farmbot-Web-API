module Api
  class TokensController < Api::AbstractController
    skip_before_action :authenticate_user!, only: :create
    skip_before_action :check_fbos_version, only: :create
    CREDS    = Auth::CreateTokenFromCredentials
    NO_CREDS = Auth::CreateToken
    NO_USER_ATTR = "API requets need a `user` attribute that is a JSON object."

    def create
      if_properly_formatted do |auth_params|
        klass = (auth_params[:credentials]) ? CREDS : NO_CREDS
        mutate klass.run(auth_params).tap { |result| maybe_halt_login(result) }
      end
    end

    private
    # Don't proceed with login if they need to sign the EULA
    def maybe_halt_login(result)
      result.result[:user].try(:require_consent!) if result.success?
    end

    def if_properly_formatted
      user = params.as_json.deep_symbolize_keys.fetch(:user, {})
      # If data handling for this method gets any more complicated,
      # extract into a mutation.
      if(user.is_a?(Hash))
        yield({ email:          user.fetch(:email, "").downcase,
                password:       user[:password],
                credentials:    user[:credentials],
                agree_to_terms: !!user[:agree_to_terms],
                host:           $API_URL })
      else
        render json: {error: NO_USER_ATTR}, status: 422
      end
    end
  end
end
